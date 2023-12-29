import { Optional } from 'sequelize';
import { Contract } from './model';

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
  paid: number;
  paymentDate: Date;
  ContractId?: number;
  Contract?: Contract;
}

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

export enum ContractStatus {
  IN_PROGRESS = 'in_progress',
  TERMINATED = 'terminated',
  NEW = 'new'
}

export enum ProfileTypes {
  CONTRACTOR = 'contractor',
  CLIENT = 'client'
}
