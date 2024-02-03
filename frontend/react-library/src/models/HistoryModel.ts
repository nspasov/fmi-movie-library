class HistoryModel {
    id: number;
    userEmail: string;
    checkOutDate: string;
    returnedDate: string;
    title: string;
    director: string;
    description: string;
    img: string;

    constructor(id: number, userEmail: string, checkOutDate: string, returnedDate: string, title: string, director: string, img: string, description: string){
        this.id = id;
        this.userEmail = userEmail;
        this.checkOutDate = checkOutDate;
        this.returnedDate = returnedDate;
        this.title = title;
        this.director = director;
        this.img = img;
        this.description = description;
    }
}

export default HistoryModel;