export interface Application {
  id: string;
  vacancy: string;
  candidate: {
    firstName: string;
    lastName: string;
  };
  status: Status;
  reviewer: {
    firstName: string;
    lastName: string;
  };
  score: number;
}

enum Status {
  invited,
  started,
  completed,
  evaluated,
}
