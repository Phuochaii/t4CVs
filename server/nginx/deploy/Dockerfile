# Sử dụng hình ảnh Nginx chính thức từ Docker Hub
FROM nginx:1.27.0

RUN rm /etc/nginx/conf.d/default.conf 
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf 