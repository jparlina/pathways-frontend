import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { selectNewlyRecommendedTasks } from '../../selectors/tasks/select_newly_recommended_tasks';
import { DismissNewlyAddedTasksPopupAction, dismissNewlyAddedTasksPopup } from '../../stores/questionnaire/actions';
import {
    NewlyRecommendedTasksComponentProps,
    NewlyRecommendedTasksComponentActions,
    NewlyRecommendedTasksComponent,
} from './newly_recommended_tasks_component';
import { selectShowQuestionnairePopup } from '../../selectors/questionnaire/select_show_questionnaire_popup';

const mapStateToProps = (store: Store): NewlyRecommendedTasksComponentProps => ({
    showQuestionnairePopup: selectShowQuestionnairePopup(store),
    newlyRecommendedTasks: selectNewlyRecommendedTasks(store),
});

const mapDispatchToProps = (dispatch: Dispatch<Store>): NewlyRecommendedTasksComponentActions => ({
    dismissPopup: (): DismissNewlyAddedTasksPopupAction => dispatch(dismissNewlyAddedTasksPopup()),
});

export const NewlyRecommendedTasksConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(NewlyRecommendedTasksComponent);
