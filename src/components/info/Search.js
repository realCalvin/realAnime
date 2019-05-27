import React, {Component} from 'react';

class Search extends Component {
    render() {
        return (
            <div className="container search">
                <div id="landing-page">
                    <form id="searchForm" className="form-inline" onSubmit={this.props.handleSubmit}>
                        <input size="50" type="text" className="form-control anime-input" id="searchText" placeholder="Search Anime"></input>
                        <button className="btn btn-link btn-sm"><i className="fas fa-search"></i></button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Search