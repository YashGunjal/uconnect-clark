import React, { useEffect, useState } from "react";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../../../services/SocketService";
import socket from "../../../../services/SocketBase";

import ChatTile from "./chattile/ChatTile";
import { updateSearchText, subjectskey } from "../main/subjects/SubjectsSlice";
import PostServices from "../../../../services/PostServices";
import { postskey } from "./PostSlice";
import { updatePostAndReplies } from "./PostSlice";
import Loading from "../../../components/loading/Loading";
import { AiFillPlusCircle } from "react-icons/ai";
import CreatePost from "./CreatePost";

export default function ChatWindow({ height }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const { selectedSubject, searchText } = useSelector((state) => {
    return state[subjectskey];
  });

  const { postsBySubjects } = useSelector((state) => {
    return state[postskey];
  });

  // updating post, fetching post

  useEffect(async () => {
    setLoading(true);
    if (selectedSubject != null) {
      let response = await PostServices.getPostbySubject(selectedSubject);
      dispatch(
        updatePostAndReplies({
          post: { [selectedSubject]: response.post },
          reply: response.replies,
        })
      );
    }
    setLoading(false);
  }, [selectedSubject]);

  let resultCount = 0;

  useEffect(() => {}, [postsBySubjects]);

  useEffect(async () => {
      // don't remove,  important for page refresh
  }, [count]);

  return (
    <>
      <div style={{ minHeight: height - 111 }}>
        {selectedSubject == null ? (
          <p className="h3 text-center"> Please select a Subject </p>
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            {searchText.length > 2 ? (
              <>
                {postsBySubjects?.[selectedSubject]
                  ?.filter(
                    (post) =>
                      post.content
                        .toLowerCase()
                        .indexOf(searchText.toLowerCase()) != -1
                  )
                  .map((post) => {
                    resultCount += 1;
                    return <ChatTile post={post} />;
                  })}
                {resultCount == 0 && (
                  <p className="h3 text-center">
                    {" "}
                    No Results.{" "}
                    <span
                      className="text-underline pointer"
                      onClick={() => dispatch(updateSearchText(""))}
                    >
                      Reset Search
                    </span>
                  </p>
                )}
              </>
            ) : (
              <>
                {postsBySubjects?.[selectedSubject]?.map((post) => (
                  <ChatTile post={post} />
                ))}
              </>
            )}
          </>
        )}
      </div>
      {selectedSubject !== null && searchText.length < 3 && <CreatePost />}
    </>
  );
}
