#cam 4: - Czech republic
ffmpeg -i http://91.187.63.35:88/mjpg/video.mjpg -vsync -1 ` -c:v libx264 -b:v 2048k -vf "scale=720:trunc(ow/a/2)*2,setpts=4.3*PTS" ` -tune zerolatency -preset veryfast -crf 23 -g 60 -hls_list_size 0 -f flv rtmp://localhost/hls/stream_CAM4_low ` -c:v libx264 -b:v 448k -vf "scale=480:trunc(ow/a/2)*2,setpts=4.3*PTS" ` -tune zerolatency -preset veryfast -crf 23 -g 60 -hls_list_size 0 -f flv rtmp://localhost/hls/stream_CAM4_mid ` -c:v libx264 -b:v 288k -vf "scale=360:trunc(ow/a/2)*2,setpts=4.3*PTS" ` -tune zerolatency -preset veryfast -crf 23 -g 60 -hls_list_size 0 -f flv rtmp://localhost/hls/stream_CAM4_high ` -c:v libx264 -vf "setpts=4.3*PTS" -f flv rtmp://localhost/hls/stream_CAM4_src