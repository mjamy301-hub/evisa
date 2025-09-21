import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const idNum = Number(session.id);

  const user = await prisma.user.findUnique({
    where: { Id: idNum },
    select: {
      Id: true,
      Email: true,
      Role: true,
      Application: {
        select: { Id: true, Status: true }
      }
    }
  });

  if (!user) {
    return null;
  }

  return user;
}
