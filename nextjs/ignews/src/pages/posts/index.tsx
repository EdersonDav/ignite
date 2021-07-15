import Head from 'next/head';
import styles from './styles.module.scss';
const Posts = () => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Post 01</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              eos illum ab eum suscipit, at inventore vel cumque? Nostrum ad
              earum porro molestiae aliquid tenetur culpa quibusdam consequatur
              dicta et!
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Post 01</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              eos illum ab eum suscipit, at inventore vel cumque? Nostrum ad
              earum porro molestiae aliquid tenetur culpa quibusdam consequatur
              dicta et!
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Post 01</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              eos illum ab eum suscipit, at inventore vel cumque? Nostrum ad
              earum porro molestiae aliquid tenetur culpa quibusdam consequatur
              dicta et!
            </p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Posts;
