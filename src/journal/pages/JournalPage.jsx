import { useDispatch, useSelector } from "react-redux";
// import { Typography } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { startNewNote } from "../../store/journal";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView, NoteView } from "../views";


export const JournalPage = () => {

    const { isSaving, active } = useSelector((state) => state.journal);

    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }

    return (
        <JournalLayout>
            {/* <Typography>Culpa eiusmod aliqua adipisicing duis tempor magna aliqua do. Ex dolore ullamco esse tempor qui aute fugiat Lorem pariatur pariatur tempor aute. Cillum pariatur irure eu aliqua deserunt minim ad. Deserunt consequat pariatur non veniam do qui cillum ex. Esse anim voluptate mollit Lorem et adipisicing culpa ex commodo mollit consequat dolor nisi. Aliqua ut laboris ullamco voluptate ut do officia cillum dolore do anim nulla. Elit nisi nulla id nostrud.</Typography> */}

            {
                (!!active)
                ? <NoteView />
                : <NothingSelectedView />
            }

            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
                onClick={ onClickNewNote }
                disabled={isSaving}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}
