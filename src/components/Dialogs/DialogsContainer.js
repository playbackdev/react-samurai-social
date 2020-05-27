import Dialogs from "./Dialogs";
import {dialogSendMessage} from "../../redux/DialogsReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
    };
};
const mapDispatchToProps = {
    dialogSendMessage
};

//export default connect(mapStateToProps, mapDispatchToProps)(withAuthRedirect(Dialogs));
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);