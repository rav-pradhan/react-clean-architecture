# React Clean Architecture test - book management app

This is a training project in which I attempt to implement something akin to Clean Architecture in a React app.

The app itself is simple: it is a book management service that lets users keep a track of what books they are reading. Think Goodreads, but functionally streamlined for demo purposes.

## Reasoning

I wanted to learn more about hex/clean/onion (insert buzzword of the day) architecture, and particularly within the context of a frontend application. I think it's common for frontend applications to be architected in such a way so that business logic and domain language is heavily coupled to the UI presentation library, inadvertently or otherwise.

As such, using a layered architecture to separate out these domains from the overall UI, and ensure that these layers never require any external dependencies, should lead to a more resilient application. Frontend libraries come and go with the wind, so the more we can defend ourselves from those changes, the better it should be for the longevity of our applications.

## The architectural composition

### Core

This is where the fundamental domain and business rules of the application reside. The core library is split into various strata, listed below from the most inner layer, to the most outer:

1. **Domain** - The domain contains objects which model the domain in an agnostic way.
2. **Usecases** - Usecases serve a user's need for the system. Each use case is a class with an `invoke()` method.
3. **Gateway** - The Gateway is responsible for adapting an external I/O source for the usecases. In this demo application, the gateway is the interface between the usecases and a mock API Server (json-server).
4. **Adapter (perhaps to be renamed)** - I might rename this, as I don't think this is correct terminology. However, this layer constructs an initialiser that includes all of the usecases and a specific implementation of a gateway (in this case, a json-server gateway implementation).
