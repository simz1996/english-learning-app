// src/index.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a new student
  const student = await prisma.student.create({
    data: {
      name: 'Simaira',
      email: 'simairamou8@gmail.com',
    },
  });
  
  console.log('Created student:', student);

  // Create a new progress record
  const progress = await prisma.progress.create({
    data: {
      studentId: student.id,
      details: 'Completed chapter 1',
    },
  });

  console.log('Created progress record:', progress);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
