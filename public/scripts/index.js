/**
 * Created by jiajia on 2017/4/17.
 */

var data = [
  {id:1, author: 'Pete Hunt', text: 'This is one comment'},
  {id:2, author: 'Jordan', text: 'This is *another* comment'}
];

var Comment = React.createClass({
  rawMarkup: function () {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function () {

    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    )
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
          <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
      );
    });

    return (
      <div className="commentList">{commentNodes}</div>
    );

  }
});

var CommentForm = React.createClass({
    render : function () {
      return (
        <div className="commentForm">
          Hello, world! I am a commentForm.
        </div>
      );
    }
});

var CommentBox = React.createClass({
  render: function () {
    return (
      <div className='commentBox'>
        Hello, world! I am a commentBox.
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
