import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaClient } from '@prisma/client';
import { admin } from '@prisma/client';

@Injectable()
export class AdminsService {
  constructor(private readonly db: PrismaClient) { }

  /**
   * Add a new admin user to the system.
   * 
   * This endpoint allows the creation of a new admin user in the database. The data 
   * provided in the request body must be in the format of the `CreateAdminDto` object, 
   * which includes the user's full name, email address, phone number, and password.
   * 
   * The system ensures that the data provided is valid, with the following requirements:
   * - Name: A non-empty string representing the full name of the admin.
   * - Email: A valid email address.
   * - Phone Number: A phone number in international format.
   * - Password: A strong password with at least 8 characters, including uppercase, 
   *   lowercase, numbers, and special characters.
   * 
   * If the data is valid, the newly created admin user will be saved in the database.
   * 
   * @param createAdminDto - The `CreateAdminDto` object containing the details of 
   * the new admin user. The expected properties are:
   *   - `name`: The full name of the admin (string).
   *   - `email`: A valid email address for the admin (string).
   *   - `phoneNumber`: A phone number in international format (string).
   *   - `password`: A secure password for the admin (string).
   * 
   * @returns {Promise<admin>} - Returns a promise that resolves to the newly created 
   * admin user object. The returned object includes all the provided details.
   */

  async create(createAdminDto: CreateAdminDto): Promise<admin> {
    return this.db.admin.create({
      data: createAdminDto
    });
  }

  /**
 * Get all admin users from the system.
 * 
 * This endpoint retrieves all the admin users stored in the database. 
 * It returns an array of `admin` objects, each containing the details of 
 * an individual admin user, including fields such as `id`, `name`, `email` and `phoneNumber`.
 * 
 * This endpoint is useful for fetching a list of all admins for administrative 
 * or reporting purposes. The data returned will be an array of admin objects.
 * 
 * @returns {Promise<admin[]>} - A promise that resolves to an array of admin 
 * user objects, where each object contains the details of an individual admin.
 */
  async findAll(): Promise<admin[]> {
    return this.db.admin.findMany();
  }

  /**
 * Get a specific admin user by ID.
 * 
 * This endpoint retrieves a single admin user from the system using the provided 
 * `id`. If a matching admin is found, it returns the admin user object with 
 * details such as `id`, `name`, `email` and `phoneNumber`. 
 * If no admin user is found with the specified ID, the system will throw an error.
 * 
 * This endpoint is useful for retrieving the details of a specific admin 
 * user by their unique identifier.
 * 
 * @param id - The unique identifier of the admin user to retrieve.
 * 
 * @returns {Promise<admin>} - A promise that resolves to the admin user object 
 * with all the details of the specified admin user.
 * 
 * @throws {PrismaClientKnownRequestError} - If no admin user with the provided ID is found, 
 * a `P2025` will be thrown.
 */
  async findOne(id: number): Promise<admin> {
    return this.db.admin.findUniqueOrThrow({
      where: {
        id: id
      }
    });
  }

  /**
 * Update an existing admin user in the system.
 * 
 * This endpoint allows you to update the details of an existing admin user by their 
 * unique `id`. You can modify fields such as the `name`, `email`, `phoneNumber`, 
 * and `password`. Only the fields provided in the request body will be updated; 
 * fields that are not included in the `UpdateAdminDto` will remain unchanged.
 * 
 * @param id - The unique identifier of the admin user to update.
 * @param updateAdminDto - The DTO containing the updated admin user details:
 *   - `name`: (optional) The full name of the admin (string).
 *   - `email`: (optional) A valid email address (string).
 *   - `phoneNumber`: (optional) The admin's phone number (string).
 *   - `password`: (optional) A new secure password for the admin (string).
 * 
 * @returns {Promise<admin>} - The updated admin object, containing the latest values 
 * for the admin's `id`, `name`, `email`, `phoneNumber`, and `updatedAt`.
 * 
 * @throws {PrismaClientKnownRequestError} - If no admin user with the provided ID is found, 
 * a `P2025` will be thrown.
 */
  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<admin> {
    return this.db.admin.update({
      where: {
        id: id
      },
      data: updateAdminDto
    });
  }

  /**
 * Delete an admin user from the system by ID.
 * 
 * This endpoint allows for the deletion of an admin user from the system by their 
 * unique `id`. The admin user will be permanently removed from the database. 
 * If no admin user with the specified `id` exists, an error will be thrown.
 * 
 * @param id - The unique identifier of the admin user to delete.
 * 
 * @returns {Promise<admin>} - The deleted admin user object, containing the details 
 * of the admin user that was removed (e.g., `id`, `name`, `email`, `phoneNumber`).
 * 
 * @throws {PrismaClientKnownRequestError} - If no admin user with the provided ID is found, 
 * a `P2025` will be thrown.
 */
  async remove(id: number): Promise<admin> {
    return this.db.admin.delete({
      where: {
        id: id
      }
    });
  }
}
