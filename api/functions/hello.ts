export const helloMain = async(event: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Chris Ya Jazz Go Serverless v1.0! Your function executed successfully! yeah baby',
        input: event,
      },
      null,
      2,
    ),
  }
}
