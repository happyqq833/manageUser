import { Alert } from "react-bootstrap";

const NotFound = () => {
    return(
        <>
            <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
               Page not Found!
            </p>
            </Alert>
        </>
    )
}

export default NotFound;