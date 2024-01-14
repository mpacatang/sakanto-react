git pull
yarn run build
pm2 delete "sakanto-react-dev"
pm2 start npm --name "sakanto-react-next-js" -- start
