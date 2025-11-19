class IUserActivityRepository {
  async save(activity) {
    throw new Error('save() must be implemented');
  }
  
  async findAll(filters, limit, offset) {
    throw new Error('findAll() must be implemented');
  }
  
  async count(filters) {
    throw new Error('count() must be implemented');
  }
}

export default IUserActivityRepository;
