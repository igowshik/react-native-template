#!/bin/bash

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep ".jsx\{0,1\}$")

if [[ "$STAGED_FILES" = "" ]]; then
  echo "Currently there are no files staged in git for validation."
  echo -e "Run 'git help add' for more on staging files for a commit.\n"
  exit 0
fi

GREEN='\033[32m'
RED_BG='\033[41m'
GREEN_BG='\033[42m'
NC='\033[0m'

PASS=true

echo -e "\nValidating Javascript with eslint:"

# Check for eslint
which eslint &> /dev/null
if [[ "$?" == 1 ]]; then
  echo -e "\t${RED_BG}Please install ESlint${NC}"
  exit 1
fi

for FILE in ${STAGED_FILES}
do
  eslint "$FILE"

  if [[ "$?" == 0 ]]; then
    echo -e "\t${GREEN}Passed: $FILE${NC}"
  else
    echo -e "\t${RED_BG}Failed: $FILE${NC}"
    PASS=false
  fi
done

echo -e "Javascript validation completed."

if ! ${PASS}; then
  echo -e "\n${RED_BG}ESlint validation failed!${NC} Fix the ESLint errors and try again. You can run ESLint validation manually via 'npm run eslint'."
  exit 1
else
  echo -e "\n${GREEN_BG}ESlint validation succeeded :)${NC}"
fi

exit $?
