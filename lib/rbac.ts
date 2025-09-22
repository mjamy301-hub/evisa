import { Role } from "@prisma/client";

export type Permission =
  | "applications:create"
  | "applications:read:own"
  | "applications:read:all"
  | "applications:update:all"
  | "applications:delete:all"
  | "applications:approve"
  | "users:read:all"
  | "users:create"
  | "users:update:all"
  | "users:delete:all"
  | "file:read:all"
  | "file:create";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    "applications:create",
    "applications:read:all",
    "applications:update:all",
    "applications:delete:all",
    "applications:approve",
    "users:read:all",
    "users:create",
    "users:update:all",
    "users:delete:all",
    "file:create",
    "file:read:all"
  ],
  USER: ["applications:read:own", "file:read:all"]
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function checkPermission(role: Role, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Access denied: Missing permission ${permission}`);
  }
}

export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role];
}

export interface RouteAccess {
  path: string;
  roles: Role[];
}

export const ROUTE_ACCESS: RouteAccess[] = [
  { path: "/", roles: [] },
  { path: "/login", roles: [] },
  { path: "/visa-c", roles: [Role.ADMIN, Role.USER] },
  { path: "/visa-d/:id", roles: [Role.ADMIN, Role.USER] },
  { path: "/my-request", roles: [Role.USER] },
  { path: "/users", roles: [Role.ADMIN] }
];

function patternToRegex(pattern: string): RegExp {
  let rx = pattern.replace(/[.*+?^${}()|\\]/g, (m) => `\\${m}`).replace(/\//g, "\\/");
  rx = rx.replace(/:([A-Za-z0-9_]+)/g, "[^/]+");
  rx = rx.replace(/\[\[\.\.\.(\w+)\]\]/g, "(?:.*)");
  rx = rx.replace(/\[\.\.\.(\w+)\]/g, "(?:.+)");
  rx = rx.replace(/\[(\w+)\]/g, "[^/]+");

  return new RegExp(`^${rx}$`);
}

const compiledRules = [...ROUTE_ACCESS]
  .sort((a, b) => b.path.length - a.path.length)
  .map((r) => ({ ...r, regex: patternToRegex(r.path) }));

export function matchRoute(pathname: string): RouteAccess | undefined {
  return compiledRules.find((r) => r.regex.test(pathname));
}

export function isPublicRoute(pathname: string): boolean {
  const rule = matchRoute(pathname);
  return !rule || rule.roles.length === 0;
}

export function isAllowed(pathname: string, role?: Role): boolean {
  const rule = matchRoute(pathname);
  if (!rule) return true;
  if (rule.roles.length === 0) return true;
  if (!role) return false;
  return rule.roles.includes(role);
}
