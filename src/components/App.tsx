import ReviewForm from './review/ReviewForm';
import ReviewsTable from './table/ReviewTable';
import ModalRenderer from './modal/ModalRenderer';
import ThemeToggle from './ThemeToggle';

function App() {
  return (
    <div className="page-layout">
      <ReviewForm />
      <ReviewsTable />
      <ModalRenderer />
      <ThemeToggle />
    </div>
  );
}

export default App;
