export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  limit: number;
}

export async function paginate<T>(
  repository: any,
  paginationDto: { page: number; limit: number },
  options: { where?: any; relations?: string[]; order?: any } = {},
): Promise<PaginatedResponse<T>> {
  const { page = 1, limit = 5 } = paginationDto;

  const skip = (page - 1) * limit;

  const [data, total] = await repository.findAndCount({
    where: options.where,
    relations: options.relations,
    skip,
    take: limit,
    order: options.order || { id: 'DESC' },
  });

  return {
    list: data,
    total,
    page,
    limit,
  };
}
