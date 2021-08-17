import { BaseResolver } from './BaseResolver';
import { Product } from '../models';
import { Resolver } from 'type-graphql';

@Resolver()
export class ProductResolver extends BaseResolver(() => Product, 'product') {}
