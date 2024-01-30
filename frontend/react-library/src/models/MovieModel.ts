class MovieModel {
  id: number;
  title: string;
  director?: string;
  description?: string;
  copies?: number;
  copiesAvailable: number;
  category?: string;
  img?: string;

  constructor(
    id: number,
    title: string,
    director: string,
    description: string,
    copies: number,
    copiesAvailable: number,
    category: string,
    img: string
  ) {
    this.id = id;
    this.title = title;
    this.director = director;
    this.description = description;
    this.copies = copies;
    this.copiesAvailable = copiesAvailable;
    this.category = category;
    this.img = img;
  }
}

export default MovieModel;
