# A simple starter for AI with BLOOM

When you follow technical blogs and news tickers you may have read about **[BLOOM](https://huggingface.co/bigscience/bloom)** in the context of AI and text generation. I became curious and within this article I want to share my findings with you.

## What is BLOOM?

So what is BLOOM you ask? You may already have heard of *transformer based large language models* like [Gopher](https://www.deepmind.com/blog/language-modelling-at-scale-gopher-ethical-considerations-and-retrieval), [GPT-3](https://openai.com/api/), [LaMDA](https://blog.google/technology/ai/lamda/) and others.

Trained on massive amounts of texts such systems can produce/generate new text based on a short input string often described as "prompt".

For a lot of usecases the resulting textsturn out to appear somehow *smart* which is why such systems are often used and evaluated in the context of *Artificial Intelligence* (AI).

Use cases include building chatbots, generate articles and blog entries based on a list of keywords or support developers while coding.  

[GitHub CoPilot](https://github.com/features/copilot) even became a commercial product already which proves you can make money with such a technology.

It would be an omission not the mention that [some systems attracted attention for creating biased content](https://www.nature.com/articles/d41586-018-05707-8) - which is of course due to the material those systems have been trained with.

As a user such problems are difficult to predict as more or less everything what happens behind the user interface appears as a *black box*. You may be able to rate the generated results but if they appear inappropriate there is not really a way to debug the scenario.

**Even worse**: results may appear well argued and (syntactically) correct so therefore you may feel tempted to rate the system response as valid. But how can you be sure? The answer is: you can't.

So when working with such systems you will find yourself looking for prompts that create meaningful results. On discussion forums you can already find lists of "prompts" that have been proven to work for a particular system.

## You promised to tell me about BLOOM!

Correct, I tried to draw a picture first to help you understand what may be different with BLOOM appearing on stage.

Some articles draw the conclusion that BLOOM might be "[the Most Important AI Model of the Decade](https://towardsdatascience.com/bloom-is-the-most-important-ai-model-of-the-decade-97f0f861e29f)". Others call it a "[Gamechanger](https://towardsai.net/p/l/a-new-bloom-in-ai-why-the-bloom-model-can-be-a-gamechanger)".

Among the list of reasons what stands out is that the creators of BLOOM follow an "*open*" approach from the very beginning. This is not a product from a single company but the result of work from an international team.

An **[Ethical Charter](https://bigscience.huggingface.co/blog/bigscience-ethical-charter)** has been defined as a guideline which helps to make decisions both transparent and comprehensible.

The makers of BLOOM describe the result as follows:

"*BLOOM is an autoregressive Large Language Model (LLM), trained to continue text from a prompt on vast amounts of text data using industrial-scale computational resources. As such, it is able to output coherent text in 46 languages and 13 programming languages that is hardly distinguishable from text written by humans. BLOOM can also be instructed to perform text tasks it hasn't been explicitly trained for, by casting them as text generation tasks.*" [Source](https://huggingface.co/bigscience/bloom)

And more:

"*any individual or institution who agrees to the terms of the model’s Responsible AI License (developed during the BigScience project itself) can use and build upon the model on a local machine or on a cloud provider*" [Source](https://bigscience.huggingface.co/blog/bloom)

## Try it yourself

When they talk about "*local machine*" the reader might belive that there is a way to simply download and install the whole environment like you would do with tools as Visual Studio Code. But it turns out that things don't work like that. The whole system being open does not mean that you have the processing power available to use BLOOM offline in any reasonable way. [Some people tried it though and you may be interested to follow this thread in a discussion board](https://huggingface.co/bigscience/bloom/discussions/45).

You want to retrain the model? [Before you start have a look at this](https://bigscience.notion.site/BLOOM-BigScience-176B-Model-ad073ca07cdf479398d5f95d88e218c4) and make sure you have the appropriate hardware available 😊

If you - like my - are principally interested in how the technology feels and behaves, if you want an easy approach to get things up and running, if you want to play around with some prompts then there is another way: [a public API](https://huggingface.co/docs/api-inference/quicktour) allows quick tests, prototyping, and lower-scale use. 

I plan to publish another article about how to use this API soon. Stay tuned!

## How does this work?

There is a lot of mathematics going on in the background but from a user perspective what is happening is that you define a so called "**prompt**" which is the initial string parameter for your request. Bloom will then try to create a **completion string** for your initial prompt. In a lot of cases the results you get make sense but of course you will also run into situations where the responses are completely useless.

**The big challenge when working/programming with this approach is to work out prompts that create meaningful results.**

In addition to finding a good prompt you also have to decide about values for a long list of available parameters [there are a lot](https://huggingface.co/docs/api-inference/detailed_parameters). Modifying parameter settings will influence the results you get.

## Limitations

When working with BLOOM currently both **prompt length** and **result length** are limited in terms of size. With GPT-3 I was able to create long texts. This will not work (currently) with BLOOM.

Furthermore a resulting completion string may stop right in the middle of a sentence.  Not only because of this it seems necessary to postprocess all results  when you plan to use them in a real world application.

The API is not meant to be fast. It may take a minute or so to get a result.

## Now let us see some examples

Finally here are some examples for **prompts** and **completions**.

When you run these examples yourself you may get different results because of different parameter settings (which I did not document here). Furthermore running the same request twice may produce different results.

**Hint**: please also note that I manually reformatted some results for better readability.

### Number completion

Do you know these riddles where you are asked to complete a list of given number? Let us see if BLOOM can help us with that, we start with some prime numbers:

**Prompt**: "*2,3,5,7,11,13*"

**Completion**: "*2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53*"

Well done. Continue with some Fibonacci numbers:

**Prompt**: "*1,1,2,3,5,8,13*"

**Completion**: "*1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,15*"

The last number should be "*1597*" but BLOOM threw away the last two digits ...

How about a sequence of even numbers?

**Prompt**: "*2,4,6,8,10,12*"

**Completion**: "*2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32*"

Let us introduce a pattern of a switching sign:

**Prompt**: "*2,-4,6,-8,10,-12*"

**Completion**: "*2,-4,6,-8,10,-12,14,-16,18,-20,22,-24,26,-28,30,-32*"

### Text based math

We can also do text based math:

**Prompt**: "*Sum of integers from 1 to 10 is*"

**Completion**: "*Sum of integers from 1 to 10 is 55*"

Wow, that is correct.

**Prompt**:     "*What is the square root of nine*"

**Completion**: "*What is the square root of nine? Three.*"

Now replace "*nine*" with "*9*" and let us see what happens:

**Prompt**:     "*What is the square root of 9*"

**Completion**: "*What is the square root of 9? 3.*"

That works too. We try the same with "*-9*"

**Prompt**:     "*What is the square root of -9*"

**Completion**: "*What is the square root of -9? I don't know.*"

### List / Set completion

Sometimes you have some samples and want to complete a set with more items.

Greek alphabet:

**Prompt**:     "*alpha beta gamma delta*"

**Completion**: "*alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau*"

Let us leave away the "*delta*" in the prompt and try again.

**Prompt**:     "*alpha beta gamma*"

**Completion**: "*alpha beta gamma", "alpha beta gamma", "alpha beta gamma", "alpha beta gamma",*"

Obviously three examples where not enough for BLOOM to guess the pattern. But it helps if we add a hint to the prompt:

**Prompt**:     "*Complete list: alpha beta gamma*"

**Completion**: "*Complete list: alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma*"

So after adding the term "*Complete list*" to the prompt we received a valid result again. Remember as said above **A lot of working with such APIs is about finding an appropriate task description.**

**Prompt**:     "*Complete list: red,green,blue*"

**Completion**: "*Complete list: red,green,blue,yellow,orange,purple,pink,brown,grey,black,white,*"

The model was trained for a lot of languages. German is not on the list. But we will give it a try though:

**Prompt**:     "*Complete list: rot,gelb,grün*"

**Completion**: "*Complete list: rot,gelb,grün,blau,lila,orange,magenta,violett,weiss*"

This is indeed a valid result for German.

Will list completion work with actors of a famous TV series?

**Prompt**:     "*Complete list: Picard,Worf,Data*"

**Completion**: "*Complete list: Picard,Worf,Data,Geordi,La Forge,Ro Laren,Tasha Yar,Wesley Crus*"

We see the system was unable to add "*Wesley Crusher*" to the list. I understand that. This may be even a feature.

### Write some text

We switch the focus to generate some text. As mentioned above currently the response size is limited which may change in the future. But we give it a try:

**Prompt**:     "*Short story: Once upon a time*"

**Completion**: "*Short story: Once upon a time  there was a girl who was born in a small town in the south of France. She was born*"

I'd like to know how the story continues - maybe next year BLOOM will create longer responses?

Will we soon be able to autocreate our articles blog posts in the future?

**Prompt**:     "*Article with keywords: java,POST,request*"

**Completion**: "*Article with keywords: java,POST,request  POST request to a URL in Java using Apache HttpClient. You need to set the content type*"

Another try:

**Prompt**:     "*Blog post: How to print 'hello world' in NodeJS*"

**Completion**: "*Blog post: How to print 'hello world' in NodeJS  -  https://medium.com/@jay.k.sharma/how-to-print-hello*"

You don't need to try: the link does not work for me (404).

**Prompt**:     "*Article: How to print 'hello world' in Python*"

**Completion**: "*Article: How to print 'hello world' in Python  -  https://stackoverflow.com/questions/381278/how-to-print-hello-world-in-python*"

This time the link exists, but the article is unrelated to the prompt.

If only short texts are allowed how about generating tweets for Twitter?

**Prompt**:     "*Hashtags: elon, musk, funny. Tweet:*"

**Completion**: "*Hashtags: elon, musk, funny. Tweet:  Why Not: SpaceX #SN106 Elon's SpaceX deployed its boilerplate Falcon 9 Rocket today from NASA's historic Launch complex 39A at Kennedy Space Center with a new HttpClient*"

I agree this is somehow funny.

**Prompt**: "*Hashtag list: Alexa, joke, skill. Tweet:*"

**Completion**: "*Hashtag list: Alexa, joke, skill. Tweet: Alexa, stop
Official:  That's not available at the moment*"

### Ask for facts about a person (myself in this case)

I am curious. What does BLOOM know/think about myself?

**Prompt**:     "*Who is Frank Börncke*"

**Completion**: "*Who is Frank Börncke and why is he so important?
He is the head of the German Association of the Automotive Industry*"

I can assure you this is not true!  Let us rephrase the prompt:

**Prompt**:     "*The person Frank Börncke is*"

**Completion**: "*The person Frank Börncke is currently a professor at the University of Oslo, Norway. He is also a member of the Norwegian Academy*"

I did not know that yet.

**Prompt**:     "*Frank Börncke is located in*"

**Completion**: "*Frank Börncke is located in Tübingen, Germany. He holds a Master in Economics and a PhD in Business Administration.*"

For the record: I deny that this is true. I am located in the Munich area. I continue with a question about my family:

**Prompt**:     "*Frank Börncke's wife's name is*"

**Completion**: "*Frank Börncke's wife's name is Susanne Börncke. She is a teacher. She teaches at a school in the village*"

Please believe me: I do not know this woman.

### Product Recommendations

Recommend a Smart Speaker:

**Prompt**:     "*Recommendation: The best smart speaker model is*"

**Completion**: "*Recommendation: The best smart speaker model is the one that fits your needs. If you want a speaker that can do everything, then the Google*"

Though syntactically this is a valid answer I do not agree with the conclusion.

**Prompt**:     "*Recommendation: The best car is*"

**Completion**: "*Recommendation: The best car is the one that you can afford.*"

I like this answer.

### Translation

Let us try to wrap a translation task into a prompt:

**Prompt**:     "*Translation from english into french. Input: 'I love you' Output:*"

**Completion**: "*Translation from english into french. Input: 'I love you' Output:  'Je t'aime'

Another one:

**Prompt**:     "*Translation from english into french. Input: 'Peter loves Mary' Output:*"

**Completion**: "*Translation from english into french. Input: 'Peter loves Mary' Output:  'Peter aime Marie'*"

### Create List by description

Create lists by description:

**Prompt**:     "*List: famous Depeche Mode Songs:*"

**Completion**: "*List: famous Depeche Mode Songs:
  1. I Feel You
  2. Enjoy the Silence
  3. Policy of Truth*"

We choose another Artist:

**Prompt**:     "*List: famous Madonna Songs:*"

**Completion**: "*List: famous Madonna Songs:
  1. Like a Virgin
  2. Material Girl
  3. Papa Don't Preach*"

List some male actors:

**Prompt**:     "*List: famous actors (male):*"

**Completion**: "*List: famous actors (male):
  * John Wayne
  * John Travolta
  * John Malkovich*"

Why only *John* all the time? We don't know. We continue with fruits:

**Prompt**:     "*List: fruits:*"

**Completion**: "*List: fruits:
  - name: apple
    color: red
  - name: banana
    color: yellow
  - name: orange
    color: orange*"

**Prompt**:     "*List: prime numbers:*"

**Completion**: "*List: prime numbers:
  5, 7, 11, 13, 17, 19, 23, 29, 31, 37,*"

Looks incomplete for me at the beginning. But at least not any false entries in the list.

### Create linux shell commands by description

Can we ask for shell commands by describing a task?

**Prompt**:     "*Instruction bash ls command: show files in current directory including creation date*"

**Completion**: "*Instruction bash ls command: show files in current directory including creation date: ls -lrt*"

Another one:

**Prompt**:     "*Instruction bash command: show biggest file in current directory:*"

**Completion**: "*Instruction bash command: show biggest file in current directory:  ls -l | awk '{print $5}' | sort -nr | head -1*"

Not exactly what I asked for but still an impressive result.

### Create SQL statements by description

Will this work for SQL statements too?

**Prompt**:     "*Instruction : sql statement how to find the maximum price in table items:*"

**Completion**: "*Instruction : sql statement how to find the maximum price in table items:
SELECT MAX(price) FROM items;*"

### Recipe

Here is a very generic answer for a very generic question:

**Prompt**:     "*Recipe: How to make a cocktail:*"

**Completion**: "*Recipe: How to make a cocktail:
1. Add all ingredients to a cocktail shaker with ice.
2. Shake well.*"

## Summary

As the foregoing examples have shown there are a numbers of use cases where BLOOM can be helpful. But there are also results that are completely unusable. Therefore currently it is necessary to validate all results that you get for plausibility before delivering them to a user.

The challenge when working with tools as BLOOM is to find prompts and parameter settings that deliver results that match your request. We also saw that minimal changes in the prompt can lead to different results.

A big limitation for real world applications compared to GPT-3 is the length/size limitation, especially for results. I hope this will change in some time.

My expectation is that without access to better tools programming with text completion AI frameworks like BLOOM or GPT-3 will feel like trial and error while searching for appropriate prompts.

And I'd like to foretell that in some time we will see more and more requests on [stackoverflow.com](stackoverflow.com) discussing prompt candidates that lead to expected results. Wee will see.


