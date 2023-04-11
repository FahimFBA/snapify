import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Link from "next/link";

const VideoList: NextPage = () => {
  const router = useRouter();
  const { videoId } = router.query as { videoId: string };

  const { data: video, isError } = api.video.get.useQuery(
    { videoId },
    {
      enabled: router.isReady,
    }
  );

  if (isError) {
    return <span>this video is not publicly available</span>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="flex min-h-[80px] w-full items-center justify-between border-b border-solid border-b-[#E7E9EB] bg-white px-6">
          <span>Screenity | {video?.title ?? ""}</span>
          <div>
            <Link href="/videos">
              <span className="mr-4 cursor-pointer rounded border border-[#0000001a] px-2 py-2 text-sm text-[#292d34] hover:bg-[#fafbfc]">
                Personal Library
              </span>
            </Link>
            <span className="cursor-pointer rounded border border-[#0000001a] px-2 py-2 text-sm text-[#292d34] hover:bg-[#fafbfc]">
              Share
            </span>
          </div>
        </div>
        <div className="flex h-full w-full grow flex-col items-center justify-center gap-12 overflow-auto bg-[#fbfbfb] px-4 py-16">
          {video?.video_url && (
            <ReactPlayer
              width="80%"
              height="auto"
              controls={true}
              url={video.video_url}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default VideoList;
