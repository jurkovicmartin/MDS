#run enginx
Set-Location C:\MDS_projekt\nginx #set path to location of nginx
Start-Process .\NGINX.exe

#cam 1: - nemecko
Start-Process powershell -ArgumentList "-File ..\start_stream1.ps1"

#cam 2: - usa 
Start-Process powershell -ArgumentList "-File ..\start_stream2.ps1"

#cam 3: - rakusko
Start-Process powershell -ArgumentList "-File ..\start_stream3.ps1"

#cam 4: - Czech republic
Start-Process powershell -ArgumentList "-File ..\start_stream4.ps1"

$SNAPSHOT_DIR="temp\temp_screenshots"
$CAM1_URL="http://176.198.135.128:8082/mjpg/video.mjpg"
$CAM2_URL="http://98.102.110.114:82/mjpg/video.mjpg"
$CAM3_URL="http://87.139.9.247/mjpg/video.mjpg"
$CAM4_URL="http://91.187.63.35:88/mjpg/video.mjpg"



#infinte loop
do{   
    $nginx = Get-Process NGINX 
    #breaks out of loop if nging is not running
    if ($nginx){
        #makes screenshot of all cameras scaled to 400px
        ffmpeg -y -i $CAM1_URL -vframes 1 -vf scale=400:-1 $SNAPSHOT_DIR\snapshot_CAM1.jpg 
        ffmpeg -y -i $CAM2_URL -vframes 1 -vf scale=400:-1 $SNAPSHOT_DIR\snapshot_CAM2.jpg 
        ffmpeg -y -i $CAM3_URL -vframes 1 -vf scale=400:-1 $SNAPSHOT_DIR\snapshot_CAM3.jpg 
        ffmpeg -y -i $CAM4_URL -vframes 1 -vf scale=400:-1 $SNAPSHOT_DIR\snapshot_CAM4.jpg 
    } else{
        break
    }
}while ($true)

Read-Host -Prompt "Press Enter to exit"