import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SearchBarComponent = () => {
    let [searchCriteria, setSearchCriteria] = useState('');
    const navigate = useNavigate();
    const searchResultPath = "/results/";

    const onSearchClick = () => {
        navigate(searchResultPath + searchCriteria.trim());
    }

    return(
        <div className="pt-1 pb-1">
            <form className="input-group">
                <input type="text" className="form-control" placeholder="Search Here" onChange={(e) => setSearchCriteria(e.target.value)}/>
                <button className="btn btn-primary" onClick={onSearchClick}>Search</button>
            </form>
        </div>
    );
}

export default SearchBarComponent;