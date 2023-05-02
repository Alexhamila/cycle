import React from 'react';

export interface Brand {
  id: number;
  name: string;
  logo: string;
}

export interface Model {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Place {
  id: number;
  name: string;
  province: string;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Material {
  id: number;
  name: string;
}

export interface Brake {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  color?: string;
}

export interface Condition {
  id: number;
  rank: string;
  title: string;
  description: string;
  icon: React.ReactElement;
}

export interface Equipment {
  id: number;
  name: string;
}
