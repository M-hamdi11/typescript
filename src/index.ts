class User {
  private _age: number;
  private notebooks: NoteBook[] = [];
  constructor(
    public id: number,
    public name: string,
    public email: string,
    private password: string,
    public phone: string,
    age: number
  ) {
    this._age = this.validateAge(age);
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = this.validateAge(value);
  }

  private validateAge(age: number): number {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    return age;
  }

  displayInfo(): void {
    console.log(`ID: ${this.id}`);
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
    console.log(`Phone: ${this.phone}`);
    console.log(`Age: ${this.age}`);

  }
  addNotebook(notebook: NoteBook): void {
    if (this.notebooks.includes(notebook)) {
      console.log("Notebook already added");
      return;
    }
    this.notebooks.push(notebook);
    console.log(`Notebook ${notebook.name}  added to ${this.name}`);
  }
  removeNotebook(notebook: NoteBook) {
    const index = this.notebooks.indexOf(notebook);
    if (index === -1) {
      console.log("Notebook not found");
      return;
    }
    this.notebooks.splice(index, 1);
    console.log(`Notebook ${notebook.name} removed from ${this.name}`);

  }

  displayNotebooks(): void {
    if (this.notebooks.length === 0) {
      console.log("No notebooks yet");
      return;
    }
    this.notebooks.forEach(nb => console.log(`- ${nb.name}`));
  }


}

const user1 = new User(1, "mahmoud", "mahmoud@gmail.com", "11112", "01023250996", 19);

user1.displayInfo();

user1.age = 22;

console.log(user1.age)

user1.displayInfo();

// ------------------------------------------------------------------------------------------
console.log("-----------------------------------------------------------------")
class Admin extends User {
  private notes: string[] = [];

  addNote(note: string): void {
    this.notes.push(note);
    console.log(`Note added: ${note}`);
  }

  deleteNote(index: number): void {
    if (index < 0 || index >= this.notes.length) {
      console.log("Note not found");
      return;
    }
    const removed = this.notes.splice(index, 1);
    console.log(`Note deleted: ${removed[0]}`);
  }

  displayNotes(): void {
    if (this.notes.length === 0) {
      console.log("No notes yet");
      return;
    }
    this.notes.forEach((n, i) => console.log(`${i + 1}. ${n}`));
  }


  override displayInfo(): void {
    super.displayInfo();
    console.log("Role: Admin");
  }
}

const admin1 = new Admin(2, "Sara", "sara@gmail.com", "pass123", "01111111111", 30);

admin1.displayInfo();
admin1.addNote("Review user reports");
admin1.addNote("Backup database");
admin1.displayNotes();
admin1.deleteNote(1);
admin1.displayNotes();


// ------------------------------------------------------------------------------------------
console.log("-----------------------------------------------------------------")
class Note {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public userId: User,      // مرجع لـ object من نوع User
  ) { }

  preview(length: number = 30): string {
    if (this.content.length <= length) {
      return this.content;
    }
    return this.content.slice(0, length).trim() + "...";
  }

  get author(): User {
    return this.userId;
  }
}
const note = new Note(1, "Meeting", "Prepare the slides and send them to the team before Sunday morning", user1)
console.log(note.preview(50))


console.log("-----------------------------------------------------------------")
class NoteBook {
  private notes: Note[] = [];
  private nextId: number = 1;
  public name: string
  constructor(name: string) {
    this.name = name
  }
  // الـ NoteBook هو اللي بينشئ الـ Note (Composition)
  addNote(title: string, content: string, user: User): Note {
    const note = new Note(this.nextId++, title, content, user);
    this.notes.push(note);
    console.log(`Note added: ${note.title}`);
    return note;
  }

  removeNote(id: number): void {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) {
      console.log("Note not found");
      return;
    }
    const removed = this.notes.splice(index, 1);
    console.log(`Note deleted: ${removed[0].title}`);
  }

  displayNotes(): void {
    if (this.notes.length === 0) {
      console.log("No notes yet");
      return;
    }
    this.notes.forEach(n => console.log(`#${n.id} ${n.title}: ${n.preview()}`));
  }
}
const user2 = new User(1, "mahmoud", "mahmoud@gmail.com", "11112", "01023250996", 19);
const book = new NoteBook('book1');
book.addNote("Meeting", "Prepare the slides and send them to the team before Sunday", user1);
book.addNote("Todo", "Fix bug", user1);
book.displayNotes()
book.removeNote(2)


console.log("-----------------------------------------------------------------")

const user1notebook = new NoteBook('boook2')
user1.addNotebook(user1notebook)

user1.displayNotebooks()


console.log("-----------------------------------------------------------------")

console.log(note.author)

console.log("-----------------------------------------------------------------")

class Storage<T> {
  private items: T[] = [];
  addItem(item: T): void {
    this.items.push(item)
    console.log(`item added succseefully`)
  }

  removeItem(item: T): void {
    const index = this.items.indexOf(item);
    if (index === -1) {
      throw new Error("item not found")
    }
    const deleted = this.items.splice(index, 1)
    console.log(`${deleted[0]} deleted succssefully`)

  }

  getAllItems(): void {
    this.items.forEach((item, index) => {
      console.log(`${index + 1}: ${item}`)
    });
  }

}

const store = new Storage<number>()
store.addItem(2)
store.addItem(3)
store.addItem(4)
store.addItem(5)
store.getAllItems()
store.removeItem(4)
store.getAllItems()


