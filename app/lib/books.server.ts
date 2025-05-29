import { prisma } from "~/lib/prisma.server";

export async function getAllBooks() {
  return prisma.book.findMany();
}

export async function getBookById(id: number) {
  return prisma.book.findUnique({ where: { id } });
}

export async function createBook(data: {
  title: string;
  author: string;
  year: number;
}) {
  return prisma.book.create({ data });
}

export async function updateBook(id: number, data: {
  title: string;
  author: string;
  year: number;
}) {
  return prisma.book.update({
    where: { id },
    data,
  });
}

export async function deleteBook(id: number) {
  return prisma.book.delete({ where: { id } });
}
