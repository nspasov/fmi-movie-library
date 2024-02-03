class AddMovieRequest {
  title: string;
  director: string;
  description: string;
  copies: number;
  //copiesAvailable: number;
  category: string;
  img?: string;

  constructor(
    title: string,
    director: string,
    description: string,
    //copiesAvailable: number,
    copies: number,
    category: string
  ) {
    this.title = title;
    this.director = director;
    this.description = description;
    this.copies = copies;
    this.category = category;
    //this.copiesAvailable = copiesAvailable;
  }
}

export default AddMovieRequest;
