import React, {Fragment} from "react";
import { Input, Segment } from "semantic-ui-react";


const Test = props => {
  let { isLoggedIn } = props;

  if (isLoggedIn) {
    return <Segment  attached>{props.coment_text}</Segment>;
  } else {
    return <Segment  attached><Input placeholer={props.coment_text}></Input></Segment>;
  }
};

export default Test;