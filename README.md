# NirmanSutra

A mobile app that helps civil engineers estimate construction costs from real-time material prices.

> **Status:** In active development (team of 2).

## The Problem

Civil engineers usually estimate construction costs by hand, using material rates scattered across different sources and SSR (Schedule of Rates) documents. This is slow, and it is easy to make mistakes or miss price changes in the market.

## The Solution

NirmanSutra brings the rates into one app so an engineer can estimate cost quickly and see how official rates compare with what the market is charging today.

## Features

- **Cost estimation** based on real-time material prices
- **SSR vs. market rate comparison** to see the difference clearly
- **Supplier discovery** to find where to buy materials
- **State-wise SSR access** for the state the project is in
- **Real-time data handling** so prices stay current
- **User authentication** with Firebase Authentication

## Tech Stack

| Area | Technology |
|---|---|
| Mobile app | React Native |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |

## Screenshots

[Add 3 to 4 screenshots here, for example: home screen, estimate screen, SSR vs. market comparison, supplier list]

## Getting Started

### Prerequisites

- Node.js and npm
- React Native development environment
- A Firebase project with Authentication and Firestore enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/Mrunal-Bhakare29/[repo-name].git
cd [repo-name]

# Install dependencies
npm install
```

### Firebase Setup

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** and **Cloud Firestore**.
3. Add your Firebase configuration to the project's config file ([file name]).

### Run the App

```bash
[your run command, for example: npx react-native run-android]
```

## Why Firebase?

We chose Firebase instead of building our own backend server so we could focus on the main value of the app (showing SSR vs. market rates clearly) and get real-time updates without weeks of server setup. The trade-off is limited querying and dependence on Firebase, which we accepted for the first version.

## Roadmap

- [ ] Test with practising civil engineers and collect feedback
- [ ] [Add your next planned features]

## Team

- Mrunal Bhakare ([GitHub](https://github.com/Mrunal-Bhakare29))
- Madhura Patil  ([GitHub](https://github.com/Patil-Madhura))

## Contact

Mrunal Bhakare | mrunalbhakare5@gmail.com | [LinkedIn](https://www.linkedin.com/in/mrunal-bhakare-684247285)
