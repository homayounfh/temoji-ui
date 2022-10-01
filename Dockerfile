FROM nginx:1.21.4-alpine
COPY dist/temoji-ui /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80