import { Optional } from 'sequelize';

export interface ProfileAttributes {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: "client" | "contractor";
}

export interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

export interface ProfileAttributes {
  id: number;
  firstName: string;
  lastName: string;
  profession: string;
  balance: number;
  type: "client" | "contractor";
}

export interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

export interface ContractAttributes {
  id: number;
  terms: string;
  status: "new" | "in_progress" | "terminated";
  ClientId?: number;
  ContractorId?: number;
}

export interface ContractCreationAttributes extends Optional<ContractAttributes, "id"> {}

export interface JobAttributes {
  id: number;
  description: string;
  price: number;
  paid: boolean;
  paymentDate: Date;
  ContractId?: number;
}

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}
