import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'password',
      role: 'admin',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'staff@example.com',
      password: 'password',
      role: 'staff',
    },
  });

  await prisma.user.create({
    data: {
      email: 'parent@example.com',
      password: 'password',
      role: 'parent',
    },
  });

  // Create parents
  const parent1 = await prisma.parent.create({
    data: {
      name: 'John Doe',
      contactInfo: '123 Main St., Anytown, USA',
      emergencyInfo: '555-1234',
    },
  });

  // Create children
  const child1 = await prisma.child.create({
    data: {
      name: 'Jane Doe',
      age: 3,
      parentId: parent1.id,
    },
  });

  // Create attendances for child
  prisma.attendance.create({
    data: {
      date: new Date('2023-03-10'),
      status: 'present',
      staffId: user2.id,
      childId: child1.id,
    },
  });

  await prisma.attendance.create({
    data: {
      date: new Date('2023-03-11'),
      status: 'present',
      staffId: user2.id,
      childId: child1.id,
    },
  });

  // Add children to parent
  await prisma.parent.update({
    where: { id: parent1.id },
    data: {
      children: { connect: [{ id: child1.id }] },
      billingRecords: {
        create: [
          {
            date: new Date('2023-03-01'),
            amount: 100,
            status: 'paid',
          },
          {
            date: new Date('2023-03-15'),
            amount: 100,
            status: 'unpaid',
          },
        ],
      },
    },
    include: { children: true },
  });

  // Create staff
  await prisma.staff.create({
    data: {
      name: 'Mary Smith',
      contactInfo: '456 Elm St., Anytown, USA',
      qualifications: 'CPR certified',
      attendances: {
        create: [
          {
            date: new Date('2023-03-10'),
            status: 'present',
            childId: child1.id,
          },
          {
            date: new Date('2023-03-11'),
            status: 'present',
            childId: child1.id,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
