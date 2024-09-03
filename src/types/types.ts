export interface User {
    id: number;
    email: string;
    name?: string;
  }
  
  export interface Progress {
    id: number;
    score: number;
    userId: number;
    createdAt: Date;
  }
  