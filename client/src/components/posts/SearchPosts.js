import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFilteredPosts } from '../../actions/postActions';

class SearchPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};

    this.handleChange = this.handleChange.bind(this);
    this.queryPosts = this.queryPosts.bind(this);
  }

  handleChange(e) {
      e.preventDefault();
      this.setState({query: e.target.value});
      this.props.getFilteredPosts(this.state.query);
  }

  queryPosts(e) {
      e.preventDefault();
      if (this.state.query.length > 0) {
          console.log("query is " + this.state.query);
          this.props.getFilteredPosts(this.state.query);
      }
  }

  render() {
    return (
        <div className="input-group mb-4 justify-content-center">
          <input type="text" className="form-control col-md-6"
                 value={this.state.query}
                 onChange={this.handleChange}
                 placeholder="Search Posts"/>
          <div className="input-group-append">
            <button className="btn btn-warning text-white" onClick={this.queryPosts}>
                <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
    );
  }
}

SearchPosts.propTypes = {
    getFilteredPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    query: state.query,
});

export default connect(mapStateToProps, { getFilteredPosts })(SearchPosts);