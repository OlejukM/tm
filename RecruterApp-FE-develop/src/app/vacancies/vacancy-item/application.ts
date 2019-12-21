export interface Application {
  id: string;
  candidate: {
    firstName: string;
    lastName: string;
  };
  status: Status;
  score: number;
  reviewer: {
    firstName: string;
    lastName: string;
  };
  invited: string;
}

enum Status {
  invited,
  started,
  completed,
  evaluated,
}
