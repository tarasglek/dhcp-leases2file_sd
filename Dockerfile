# docker build -t dhcp-leases2file_sd
# docker run -ti -v $PWD:/input -v $PWD:/output  dhcp2file_s.
FROM node:10-stretch
RUN wget https://github.com/watchexec/watchexec/releases/download/1.14.1/watchexec-1.14.1-x86_64-unknown-linux-gnu.deb && dpkg -i *deb && rm -f *deb
COPY package.json .
RUN yarn install
COPY index.ts .
ENTRYPOINT []
CMD set -x ; watchexec  -v -w /input/dhcp.leases --force-poll 1000  yarn run simple /input/dhcp.leases /output/file_sd.json