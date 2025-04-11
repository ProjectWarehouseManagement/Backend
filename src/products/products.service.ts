import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly db: PrismaService) { }

  /**
 * Add a new product to the system.
 * 
 * This method creates a new product in the database. The data provided in the `createProductDto` object 
 * will be used to create a new product record in the `product` table.
 * 
 * The system will automatically validate the provided data based on the requirements:
 * - Name: A non-empty string representing the product name.
 * - UnitPrice: A positive float representing the product's price per unit.
 * - Width: A positive float representing the product's width.
 * - Height: A positive float representing the product's height.
 * - Depth: A positive float representing the product's depth.
 * - Weight: A positive float representing the product's weight.
 * - Expiration: A boolean indicating whether the product has an expiration date.
 * - ExpirationDate: A valid `DateTime` object representing the product's expiration date (optional).
 * 
 * If the data is valid, the newly created product will be saved to the database.
 * 
 * @param createProductDto - The `CreateProductDto` object containing the new product's details. The properties 
 * expected in this object are:
 *   - `name`: The product's name (string).
 *   - `unitPrice`: The product's price per unit (float).
 *   - `width`: The product's width (float).
 *   - `height`: The product's height (float).
 *   - `depth`: The product's depth (float).
 *   - `weight`: The product's weight (float).
 *   - `expiration`: A boolean indicating whether the product has an expiration date (boolean).
 *   - `expirationDate`: The product's expiration date, if applicable (DateTime, optional).
 * 
 * @returns {Promise<product>} - Returns a promise that resolves to the newly created product object. The returned 
 * object includes all the provided details (name, price, dimensions, weight, expiration) and any generated fields 
 * such as product ID.
 */
  async create(createProductDto: CreateProductDto): Promise<product> {
    return this.db.product.create({
      data: {
        ...createProductDto,
      }
    });
  }

  /**
 * Retrieve all products from the system.
 * 
 * This method retrieves a list of all products from the database. The system will query the `product` table 
 * and return all records as an array of `product` objects.
 * 
 * If there are no products in the database, an empty array will be returned.
 * 
 * @returns {Promise<product[]>} - Returns a promise that resolves to an array of all products in the database. 
 * The returned array contains `product` objects with details such as name, unit price, dimensions, weight, 
 * and expiration information for each product.
 */
  async findAll(): Promise<product[]> {
    return this.db.product.findMany();
  }

  /**
 * Retrieve a single product by its ID.
 * 
 * This method retrieves a single product from the database based on the provided `id`. 
 * It queries the `product` table for the record that matches the given ID.
 * 
 * If no product with the specified `id` exists in the database, an exception will be thrown.
 * 
 * @param id - The unique identifier of the product (number).
 * 
 * @returns {Promise<product>} - Returns a promise that resolves to the `product` object 
 * corresponding to the given ID. The returned object includes details such as the name, 
 * unit price, dimensions, weight, and expiration information of the product.
 * 
 * @throws {Error} - Throws an error if no product with the given ID is found in the database.
 */
  async findOne(id: number): Promise<product> {
    return this.db.product.findUniqueOrThrow({
      where: {
        id: id
      }
    });
  }

  async findByBarcode(barcode: string): Promise<product> {
    return this.db.product.findUniqueOrThrow({
      where: {
        barcode: barcode
      }
    });
  }


  /**
 * Update an existing product in the system.
 * 
 * This method updates the details of an existing product in the database. The product to be updated 
 * is identified by the provided `id`, and the new data for the product is provided in the `updateProductDto` object.
 * 
 * The system will update only the fields that are provided in the `updateProductDto` object.
 * 
 * If no product with the specified `id` exists, an error will be thrown.
 * 
 * @param id - The unique identifier of the product to update (number).
 * @param updateProductDto - The `UpdateProductDto` object containing the updated details of the product. 
 *   The properties expected in this object are:
 *   - `name`: The updated product name (string, optional).
 *   - `unitPrice`: The updated unit price of the product (float, optional).
 *   - `width`: The updated width of the product (float, optional).
 *   - `height`: The updated height of the product (float, optional).
 *   - `depth`: The updated depth of the product (float, optional).
 *   - `weight`: The updated weight of the product (float, optional).
 *   - `expiration`: The updated expiration status of the product (boolean, optional).
 *   - `expirationDate`: The updated expiration date (DateTime, optional).
 * 
 * @returns {Promise<product>} - Returns a promise that resolves to the updated `product` object.
 *   The returned object includes all the details of the updated product, including any modified fields.
 * 
 * @throws {Error} - Throws an error if no product with the given `id` is found in the database.
 */
  async update(id: number, updateProductDto: UpdateProductDto): Promise<product> {
    return this.db.product.update({
      where: {
        id
      },
      data: {
        ...updateProductDto,
      }
    });
  }


  /**
 * Delete a product from the system.
 * 
 * This method deletes a product from the database based on the provided `id`. The system will search 
 * for the product with the given `id` and remove it from the `product` table.
 * 
 * If no product with the specified `id` exists in the database, an error will be thrown.
 * 
 * @param id - The unique identifier of the product to delete (number).
 * 
 * @returns {Promise<product>} - Returns a promise that resolves to the deleted `product` object.
 *   The returned object includes the details of the deleted product, such as its name, price, dimensions, 
 *   weight, and expiration information.
 * 
 * @throws {Error} - Throws an error if no product with the given `id` is found in the database.
 */
  remove(id: number): Promise<product> {
    return this.db.product.delete({
      where: { id }
    });
  }
}
