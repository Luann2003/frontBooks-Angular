export interface Author {
    id: number;
    name: string;
  }
  
  export interface Publisher {
    id: number;
    name: string;
  }

export interface Book {
    id: number;
    title: string;
    isbn: number;
    yearPublication: number;
    rent: boolean;
    author: Author;
    publisher: Publisher;
  }

  export interface BookResponse {
    content: Book[];
  }