import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/Book';
import { BooksService } from '../../services/books.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookForm: FormGroup;

  books: Book[] = [];
  currentBookId: number | null = null;

  constructor(private bookService: BooksService) {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      isbn: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.required, Validators.min(0)]),
      editor: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((response: any) => {
      // Se a API retorna um objeto com uma propriedade 'content', ajuste aqui
      this.books = response.content || [];  // Acessa 'content' ou usa array vazio
    });
  }


  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(
        (response) => {
          console.log('Book added successfully:', response);
          this.bookForm.reset();  // Clear the form after successful submission
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    }
  }

  onEdit(book: Book) {
    this.currentBookId = book.id;
    this.bookForm.patchValue(book);
  }

  onDelete(id: number) {
    this.books = this.books.filter(book => book.id !== id);
  }

  onClear() {
    this.currentBookId = null;
    this.bookForm.reset();
  }
}
