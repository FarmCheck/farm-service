export const exampleQuery = `
query GetProductsExample {
  products(
    take: 20,
    where: {
      location: { provinceCode: 92 },
      price: { gt: 100000, lt: 300000 } },
      # gt = greater than, ge = greater or equal
      # lt = greater than, le = less or equal
      # eq = eq equal
      # not = not equal
    order: { price: 1 } # 1 = asc, -1 = desc
  ) {
    data {
      id
      name
      price
      farm {
        id
        name
        processes {
          name
        }
      }
      location {
        province
        provinceCode
        districtCode
        district
      }
    }
    pagination {
      take
      total
      totalPage
      current
    }
  }
}
`;
