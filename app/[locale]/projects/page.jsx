import ProjectsGrid from '../components/projects/ProjectsGrid';

function index() {
	return (
		<div className="container mx-auto">
			<ProjectsGrid  showPagination={true}/>
		</div>
	);
}

export default index;
