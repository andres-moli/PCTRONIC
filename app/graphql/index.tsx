import { GraphQLError } from "graphql";
import { Alert } from "react-native";
type IToastyErrorGraph = { [key: string]: any }; // GraphQLError | { "response": { "errors": GraphQLError } }

export const ToastyErrorGraph = (request: IToastyErrorGraph) => {
    if (request.response && request.response.errors) {
      const error: GraphQLError[] = request.response.errors;
      const message = error.map(({ message }) => `${message}`)[0];
      // ToastyAlert.fire(message.replace('👮‍♂', ''), undefined, "error")
        //Alert.alert(message)
      return message;
    }
    if (request.message as GraphQLError) {
      // ToastyAlert.fire(request.message.replace('👮‍♂', ''), undefined, "error")
    //   Alert.alert(request.message)
      return request.message;
    }
    return "INTERNAL SERVER ERROR";
  };