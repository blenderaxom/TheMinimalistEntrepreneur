import { makeStyles } from "@material-ui/core";

export const buttonStyles = makeStyles({
    simple: {
        backgroundColor: "#fff",
        border: '1px solid #00000050',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: "#00000010"
        }
    }
})