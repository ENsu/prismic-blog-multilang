import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";

// Project components
import DefaultLayout from "layouts";
import { BackButton, SliceZone, LangSwitcher } from "components/post";

// Project functions & styles
import { Client } from "utils/prismicHelpers";
import { queryRepeatableDocuments } from 'utils/queries';
import useUpdatePreviewRef from 'utils/useUpdatePreviewRef';
import { postStyles } from "styles";

/**
 * Post page component
 */
const Post = ({ post, previewRef, altLangs }) => {

  useUpdatePreviewRef(previewRef, post.id)

  if (post && post.data) {
    const hasTitle = RichText.asText(post.data.title).length !== 0;
    const title = hasTitle ? RichText.asText(post.data.title) : "Untitled";

    return (
      <DefaultLayout>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="main">
          <div className="outer-container">
            <BackButton />
            <LangSwitcher altLangs={altLangs} />
            <h1>{title}</h1>
          </div>
          <SliceZone sliceZone={post.data.body} />
        </div>
        <style jsx global>
          {postStyles}
        </style>
      </DefaultLayout>
    );
  }

  return null;
};

export async function getStaticProps({ params, previewData }) {
  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { ref: previewRef } : null

  const post = await Client().getByUID("post", params.uid, {lang: params.lang, ...refOption}) || {}
  const altLangs = post.alternate_languages;
  return {
    props: {
      previewRef,
      post,
      altLangs
    }
  }
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments((doc) => doc.type === 'post')
  return {
    paths: documents.map(doc => `/blog/${doc.lang}/${doc.uid}`),
    fallback: false,
  }
}

export default Post;
