import Dialogs from "./Dialogs";
import {dialogSendMessage, dialogUpdateMessageText} from "../../redux/DialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onInputMessageChangeHandler: (text) => { dispatch(dialogUpdateMessageText(text)); },
        sendMessageHandler: () => { dispatch(dialogSendMessage()); }
    };
};

//export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs));
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);