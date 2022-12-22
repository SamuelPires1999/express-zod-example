import { testEndpoint } from "express-zod-api";
import { needsInput, primaryEndPoint } from "../src";

test("Should respond the primary endpoint successfully", async () => {
  const { responseMock, loggerMock } = await testEndpoint({
    endpoint: primaryEndPoint,
    // responseProps, configProps, loggerProps
  });
  expect(loggerMock.error).toBeCalledTimes(0);
  expect(responseMock.status).toBeCalledWith(200);
  expect(responseMock.json).toBeCalledWith({
    status: "success",
    data: {
      gretting: "Hello",
    },
  });
});

test("Should respond the input endpoint successfully", async () => {
  const { responseMock, loggerMock, requestMock } = await testEndpoint({
    endpoint: needsInput,
    requestProps: {
      method: "POST",
      body: {
        sampleInput: "aaaaaa",
      },
    },
    // responseProps, configProps, loggerProps
  });

  expect(loggerMock.error).toBeCalledTimes(0);
  expect(responseMock.status).toBeCalledWith(200);
  expect(responseMock.json).toBeCalledWith({
    status: "success",
    data: {
      validation: "Input successully validated",
    },
  });
});
