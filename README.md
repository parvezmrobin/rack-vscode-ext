# RACK

Traditional code search engines (e.g., Krugle) often do not perform well with natural language queries. They mostly apply keyword matching between query and source code. Hence, they need carefully designed queries containing references to relevant APIs for the code search. Unfortunately, preparing an effective search query is not only challenging but also time-consuming for the developers according to existing studies. In this article, we propose a novel query reformulation technique--RACK--that suggests a list of relevant API classes for a natural language query intended for code search. Our technique offers such suggestions by exploiting keyword-API associations from the questions and answers of Stack Overflow (i.e., crowdsourced knowledge). We first motivate our idea using an exploratory study with 19 standard Java API packages and 344K Java related posts from Stack Overflow. Experiments using 175 code search queries randomly chosen from three Java tutorial sites show that our technique recommends correct API classes within the Top-10 results for 83% of the queries, with 46% mean average precision and 54% recall, which are 66%, 79% and 87% higher respectively than that of the state-of-the-art. Reformulations using our suggested API classes improve 64% of the natural language queries and their overall accuracy improves by 19%. Comparisons with three state-of-the-art techniques demonstrate that RACK outperforms them in the query reformulation by a statistically significant margin. Investigation using three web/code search engines shows that our technique can significantly improve their results in the context of code search.

## Features

Upon installing this extension `RACK` command will be available.
- Press `ctrl + shift + p` and search for `RACK`.
- After seleting RACK, an input box will appear. Type you query there and press enter.
- RACK will show a list of related APIs.
- Select the APIs you think most important. If you are not sure, select **All** (first option). Then press `Enter`.
- RACK will search google and show you the related anwsers.

## Requirements

To use this extenstion you must have Java@>=8 installed
and added to PATH environment variable so that the extention can
directly access `java` command.

## Future Plan

Version `1.1` will integrate the searching facility with VS Code
so that you never have to leave your favorite editor.

Version `1.2` will add another searching method alongside google
that will search in GitHub, CodeForge and other famous code repositories
so that you don't have to take the headache to find the right code.

## Release Notes

### 1.0.0

Initial release.

Reference: M. M. Rahman, C. K. Roy and D. Lo, "RACK: Automatic API Recommendation Using Crowdsourced Knowledge," 2016 IEEE 23rd International Conference on Software Analysis, Evolution, and Reengineering (SANER), Suita, 2016, pp. 349-359, doi: 10.1109/SANER.2016.80.
